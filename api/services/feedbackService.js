const { Op } = require('sequelize')
const moment = require('moment')

function createFeedbackService(User, Feedback) {
    return {
        async submitFeedback(data, userId) {
            const { subject, message } = data

            const user = await User.findByPk(userId)
            if (!user) throw new Error('User not found')

            const feedback = await Feedback.create({ userId, subject, message })

            return {
                subject: feedback.subject,
                message: feedback.message,
            }
        },

        async getFeedbacks(userId, page, limit, searchTerm = '', filters = {}) {
            const user = await User.findByPk(userId)
            if (!user) throw new Error('User not found')

            const offset = (page - 1) * limit

            let startDate, endDate
            if (filters.dateRange) {
                ;[startDate, endDate] = filters.dateRange
                    .split(',')
                    .map((date) => moment(date.trim()))
                endDate = endDate.endOf('day')
            }

            const seekAndFilter = {
                [Op.and]: [
                    { userId: userId },
                    searchTerm
                        ? {
                              [Op.or]: [
                                  { subject: { [Op.like]: `%${searchTerm}%` } },
                                  { message: { [Op.like]: `%${searchTerm}%` } },
                              ],
                          }
                        : {},
                    startDate && endDate
                        ? {
                              createdAt: {
                                  [Op.between]: [startDate.toDate(), endDate.toDate()],
                              },
                          }
                        : {},
                ],
            }

            const { count, rows } = await Feedback.findAndCountAll({
                where: seekAndFilter,
                limit: limit,
                offset: offset,
                order: [['createdAt', 'DESC']],
            })

            const totalPages = Math.ceil(count / limit)

            return {
                feedbacks: rows,
                currentPage: page,
                totalPages: totalPages,
                totalItems: count,
                itemsPerPage: limit,
            }
        },
    }
}

module.exports = createFeedbackService
