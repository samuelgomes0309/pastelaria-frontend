import axios from "axios";
import { cookies } from "next/headers";

export const setupApi = async () => {
	const cookieStore = await cookies();
	const token = cookieStore.get("@appSG.token")?.value || null;
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
