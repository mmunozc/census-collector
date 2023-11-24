import { getData, saveData } from "./localdatabase";
var mainJson = {};
var APIurl = "";

const StartConection = async () => {
    APIurl = "http://26c3-2800-e2-c680-29d0-50ff-cec-760a-83a.ngrok.io/";
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

async function fetchDataFromApi(apiUrl, token) {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                console.error('Refresh Tokens.');
                await RefreshTokens();
                return await fetchDataFromApi(apiUrl, token);
            } else {
                console.error(`Failed to fetch data. Status: ${response.status}`);
            }
        }

        const data = await response.json();
        console.log("Received data:", data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

async function postDataToApi(apiUrl, token, content) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: content,
        });

        if (!response.ok) {
            if (response.status === 401) {
                console.error('Refresh Tokens.');
                await RefreshTokens();
                return await postDataToApi(apiUrl, token, content);
            } else {
                console.error(`Failed to fetch data. Status: ${response.status}`);
            }
        }

        const data = await response.json();
        console.log("Received data:", data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}


const GetZoneData = async (user) => {
    const token = await getData("accessToken");
    const data = await fetchDataFromApi(APIurl + user + "/", token);
    return data;
}

const SendUpdate = async (user, CFN, state) => {
    const token = await getData("accessToken");
    const content = {
        "state": state
    };
    const response = await postDataToApi(APIurl + dwelling + "/", token, content);
    return response;
}

const ValidateUser = async (user, pass) => {
    const credentials = {
        "usuario": user,
        "password": pass,
    };
    try {
        const response = await fetch(APIurl + "login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: credentials,
        });

        if (!response.ok) {
            console.error(`Failed to fetch data. Status: ${response.status}`);
        } else {
            const response = await response.json();
            console.log("Received data:", response);
            const accessToken = response.accessToken;
            const refreshToken = response.refreshToken;
            await saveData("accessToken", accessToken);
            await saveData("refreshToken", refreshToken);
            return true;
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

const RefreshTokens = async () => {
    const token = await getData("refreshToken");
    const content = {
        "token": token
    };
    const response = await postDataToApi(APIurl + "refreshToken/", token, content);
    const accessToken = response.accessToken;
    const refreshToken = response.refreshToken;
    await saveData("accessToken", accessToken);
    await saveData("refreshToken", refreshToken);
}

export { GetZoneData, ValidateUser, SendUpdate, StartConection };