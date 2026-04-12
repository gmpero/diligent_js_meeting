const HeaderData = {
    MENU: {
        ALL_ITEMS : {name: 'All Items'},
        ABOUT : {name: 'About', url: 'https://saucelabs.com/'},
        LOGOUT : {name: 'Logout'},
        RESET : {name: 'Reset App State'},
    },

    getMenuNames() {
        return Object.values(this.MENU).map(item => item.name);
    }
}

export { HeaderData };