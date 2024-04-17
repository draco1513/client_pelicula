import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, cssTransition } from "react-toastify";

const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut"
});

const simpleAlerts = (message = '😁', type = "info", theme = "dark") => {
    //theme = "colored"
    if (type === 'warning') {
        toast.warn(message, { theme: theme, transition: bounce })
    } else if (type === 'error') {
        toast.error(message, { theme: theme, transition: bounce })
    } else if (type === 'success') {
        toast.success(message, { theme: theme, transition: bounce })
    } else {
        toast.info(message, { theme: theme, transition: bounce })
    }
}

export { simpleAlerts };