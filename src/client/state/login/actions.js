export const receiveTime = (socket, packet) => (dispatch) => {
    packet.begin();

    const h = StringUtils.padLeft(`${packet.nextByte()}`, 2, '0');
    const m = StringUtils.padLeft(`${packet.nextByte()}`, 2, '0');
    const s = StringUtils.padLeft(`${packet.nextByte()}`, 2, '0');

    const time = {
        offset: 0, //TODO: calculate the diff between the client & server timezone
        loginTime: `${h}:${m}:${s}`
    };

    dispatch({
        type: types.LOGIN_UPDATE_TIME,
        payload: time
    });
};
