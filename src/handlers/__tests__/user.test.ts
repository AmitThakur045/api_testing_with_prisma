import * as user from "../user"

describe('user handler', () => {
    it('should create an user', () => {
        setTimeout(async() => {

            const req = {
                body: {
                    username: 'Chirag',
                    password: "test123"
                }
            }
            const res = {
                json({ token }) {
                    expect(token).toBeTruthy()
                }
            }
            await user.createNewUser(req, res, () => {})
        }, 10000)
    })
})