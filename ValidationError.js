document.addEventListener("DOMContentLoaded", () => {
    class ValidationError {
        getPasswordError(password){
            password = (password || "").trim();
            const rules =[
                {
                    test: () => password.length < 8,
                    message: "пароль должен быть не менее 8",
                },
                {
                    test: () => password.length = 0,
                    message: "заполните поле пароля",
                },
            ];
            for (const rule of rules) {
                if (rule.test()) return rule.message;

            }
            return"";
        }

        getEmailError(email) {
            email = (email || "").trim();

            const rules = [
                {
                    test: () => email.length === 0,
                    message: "Email не указан",
                },
                {
                    test: () => !email.includes("@"),
                    message: "Пропущен символ '@'",
                },
                {
                    test: () => {
                        const parts = email.split("@");
                        return parts.length !== 2;
                    },
                    message: "Неверное количество символов '@'",
                },
                {
                    test: () => {
                        const [local, domain] = email.split("@");
                        return !local;
                    },
                    message: "Локальная часть до '@' пуста",
                },
                {
                    test: () => {
                        const [local, domain] = email.split("@");
                        return !domain;
                    },
                    message: "Доменная часть после '@' пуста",
                },
                {
                    test: () => {
                        const domain = email.split("@")[1] || "";
                        return !domain.includes(".");
                    },
                    message: "В домене нет точки (пример: example.com)",
                },
                {
                    test: () => email.includes(".."),
                    message: "Нельзя использовать подряд две точки",
                },
                {
                    test: () => {
                        const basicEmailRegex = /^[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~.@]+$/;
                        return !basicEmailRegex.test(email);
                    },
                    message: "Есть недопустимые символы в email",
                },
                {
                    test: () => email.length > 254,
                    message: "Email слишком длинный",
                },
                {
                    test: () => {
                        const local = email.split("@")[0] || "";
                        return local.length > 64;
                    },
                    message: "Локальная часть слишком длинная",
                },
                {
                    test: () => {
                        const domain = email.split("@")[1] || "";
                        return domain.split(".").some(p => !p);
                    },
                    message: "Неправильная структура домена",
                },
            ];

            for (const rule of rules) {
                if (rule.test()) return rule.message;

            }
                return "";

        }
    }
    module.exports = new ValidationError();
});

