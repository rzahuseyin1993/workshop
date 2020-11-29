
const self = {

    validateEmail: (value) => {

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(value);
    },

    validateName: (value) => {

        const re = /^(?=.{1,50}$)[A-Za-z]+(?:['_.\s][A-Za-z]+)*$/;

        return re.test(value);
    },

    validateZipcode: (value) => {

        const re = /^\d+$/;

        return re.test(value);
    },
}

export default self;

