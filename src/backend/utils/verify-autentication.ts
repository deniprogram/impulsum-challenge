import jsonwebtoken from 'jsonwebtoken'

const validToken = (token: any) => {
    try {
        return jsonwebtoken.verify(token, process.env.JWT_SECRET || 'secret')
    } catch (err: any) {
        throw new Error('Invalid token')
    }
}

export default validToken