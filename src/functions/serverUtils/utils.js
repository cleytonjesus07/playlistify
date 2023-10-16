
export const encodeURL = (data) => {
    if (!data?.length) return undefined;
    return Buffer.from(data).toString("base64");
}

export const decodeURL = (data) => {
    if (!data?.length) return undefined;
    return Buffer.from(data, "base64").toString()
}

