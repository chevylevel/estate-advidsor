export interface SignDataResponse {
    apikey: string;
    timestamp: string;
    signature: string;
    cloudname: string;
}

export interface UploadImageResponse {
    secure_url: string,
    public_id: string,
}
