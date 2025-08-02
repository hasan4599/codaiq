export interface OpenProviderLoginResponse {
    code: number;
    desc: string;
    data: {
        token: string;
        reseller_id: number;
    };
}


export async function loginToOpenProvider(username: string, password: string, ip: string = '0.0.0.0'): Promise<OpenProviderLoginResponse> {
    const response = await fetch('https://api.openprovider.eu/v1beta/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, ip }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenProvider login failed: ${error}`);
    }

    const data = await response.json();
    return data;
}
