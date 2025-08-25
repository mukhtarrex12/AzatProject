import axios from "axios";
import type { User } from "../../types/user/User";

const API_URL = "/api/users";

export async function getUsers(email?: string, name?: string): Promise<User[]> {
    const params: Record<string, string> = {};
    if (email) params.email = email;
    if (name) params.name = name;

    const { data } = await axios.get<User[]>(API_URL, { params });
    return data;
}

export async function createUser(user: Omit<User, "id">): Promise<number> {

    const payload = {
        id: 0,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt ?? new Date().toISOString()
    };

    const { data } = await axios.post<number>(API_URL, payload, {
        headers: { "Content-Type": "application/json" }
    });

    return data;
}

export async function updateUser(id: number, user: User): Promise<void> {
    const payload = {
        id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    };

    await axios.put(`${API_URL}/${id}`, payload, {
        headers: { "Content-Type": "application/json" }
    });
}

export async function deleteUser(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
}
