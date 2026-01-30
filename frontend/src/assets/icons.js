
export let getIcon = function(element, icon) {
    if (icon === "sport") 
        if (element[icon] === "football")
            return "futbol";
        else return element[icon];
    else if (icon === "users" || icon === "user")
        return icon
}

