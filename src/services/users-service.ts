class UsersService {
    async getUser(uuid: string): Promise<User> {
        return {
            uuid: uuid,
            fullname: 'Пупкин Василий Васильевич',
        }
    }
}