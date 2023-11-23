var mainJson = {};

const StartConection = async () => {
    mainJson = {
        "050000111": {
            "00000101110": {
                "direction": "Carrera 45 # 123 - 56, Medellín",
                "state": false,
                "ECN": "438525040000"
            },
            "00000201110": {
                "direction": "Calle 70 # 45 - 89, Medellín",
                "state": false,
                "ECN": "739510630000"
            },
            "00000301110": {
                "direction": "Avenida 80 # 34 - 67, Medellín",
                "state": false,
                "ECN": "294170420000"
            }
        },
        "050010222": {
            "00000102220": {
                "direction": "Calle 12 # 345, Medellín",
                "state": false,
                "ECN": "050004"
            },
            "00000202220": {
                "direction": "Carrera 25 # 678, Medellín",
                "state": false,
                "ECN": "050005"
            },
            "00000302220": {
                "direction": "Avenida 50 # 901, Medellín",
                "state": false,
                "ECN": "050006"
            }
        },
        "050020333": {
            "00000403330": {
                "direction": "Carrera 60 # 234, Medellín",
                "state": false,
                "ECN": "050007"
            },
            "00000503330": {
                "direction": "Calle 85 # 789, Medellín",
                "state": false,
                "ECN": "050008"
            },
            "00000603330": {
                "direction": "Avenida 95 # 012, Medellín",
                "state": false,
                "ECN": "050009"
            }
        }
    };
}

const GetZoneData = async (user) => {
    return mainJson[user];
}

const SendUpdate = async (user, item) => {
    mainJson[user][item.CFN] = item;
}

const ValidateUser = async (user) => {
    return mainJson.hasOwnProperty(user);
}

export { GetZoneData, ValidateUser, SendUpdate, StartConection };