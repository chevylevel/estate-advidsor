import axios from 'axios';
import type { AxiosResponse } from 'axios';

import {
    SignDataResponse,
    UploadImageResponse
} from '../models/Cloudinary';

import api from '../http';

export default class CloudinaryService {
    private static async getSignCloudinaryData(): Promise<AxiosResponse<SignDataResponse>> {
        return api.get<SignDataResponse>('/sign-upload-form');
    }

    static async uploadImage(imageFile): Promise<AxiosResponse<UploadImageResponse>> {
        const signDataResponse = await CloudinaryService.getSignCloudinaryData();

        const {
            apikey,
            timestamp,
            signature,
            cloudname,
        } = signDataResponse.data;

        const url = `https://api.cloudinary.com/v1_1/${cloudname}/auto/upload`;

        return axios.postForm<UploadImageResponse>(url, {
            file: imageFile,
            api_key: apikey,
            timestamp: timestamp,
            signature: signature,
            folder: 'realty_images',
        });
    }
}
