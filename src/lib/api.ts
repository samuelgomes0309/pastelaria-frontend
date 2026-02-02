import axios from "axios";
import { parseCookies } from "nookies";

type SetupApiProps = {
	context?: any;
};

export const setupApi = ({ context }: SetupApiProps = {}) => {
	const cookies = parseCookies(context);
	const token = cookies["@appSG.token"];
	const api = axios.create({
		baseURL: process.env.NEXT_PUBLIC_API_URL as string,
		timeout: 1000 * 5, // 5 seconds
		headers: {
			Authorization: token ? `Bearer ${token}` : "",
		},
	});
	api.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response) {
				if (error.response.status === 401) {
					window.location.href = "/login";
				}
			}
			return Promise.reject(error);
		}
	);
	return api;
};
