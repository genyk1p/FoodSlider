const postData = async(url, data) => {
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    return await res.json();
};
const getResourse = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    } else {
        // console.log(res.json());
        return await res.json();
    }
};
export {postData, getResourse};