interface IUser {
    readonly username: string,
    readonly password: string,
}

interface IUserData {
    readonly standard_user: IUser,
    [key: string]: IUser,
}

const UserData: IUserData = {
    standard_user: {
        username: "standard_user",
        password: "secret_sauce",
    },

    invalid_user: {
        username: "invalid_user",
        password: "invalid_password",
    },

    problem_user: {
        username: "problem_user",
        password: "secret_sauce",
    },
}

export { UserData };