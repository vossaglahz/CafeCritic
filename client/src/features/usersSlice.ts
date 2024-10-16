import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApiClient } from "@/helpers/axiosApiClient";
import { FieldTypeSignIn } from "@/components/SignIn";
import { isAxiosError, AxiosError } from "axios";
export interface IUserError {
    type: string
    messages: string[]
}

export interface IUserState {
  id: string;
  username: string;
  displayName: string;
  token: string;
  role: UserRoles;
  email: string;
  image: string;
}

export enum UserRoles {
    admin = "admin",
    user = "user"
}

interface State {
  user: IUserState | null;
  error: IUserError[] | null | Error;
  loading: boolean;
}

const initialState: State = {
  user: null,
  error: null,
  loading: false
}

export const registerUser = createAsyncThunk(
    'users/register',
    async (formData: FormData, {rejectWithValue}) => {
        try {
            const {data} = await axiosApiClient.post<IUserState>('/users/registration', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            localStorage.setItem('token', data.token);
            return data;
        } catch (e) {
            if(isAxiosError(e)) {
                const error: AxiosError<any> = e;
                return rejectWithValue(error.response?.data);
            } else {
                throw new Error((e as Error).message);
            }
        }
    }
);

export const signInUser = createAsyncThunk(
    'users/signInUser',
    async (body: FieldTypeSignIn, {rejectWithValue}) => {
        try {
            const {data} = await axiosApiClient.post<IUserState>('/users/signIn', body)
            localStorage.setItem('token', data.token)
            return data
        } catch (e) {
            if(isAxiosError(e)) {
                const error: AxiosError<any> = e
                return rejectWithValue(error.response?.data)
            } else {
                throw new Error((e as Error).message)
            }
        }
    }
)

export const validateToken = createAsyncThunk(
    'users/validateToken',
    async () => {
        try {
            const {data} = await axiosApiClient.get<IUserState>('/users/validateToken', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            return data
        } catch (e) {
            throw new Error((e as Error).message)
        }
    }
)

export const logout = createAsyncThunk(
    'users/logout',
    async (userId?: string) => {
        try {
            const {data} = await axiosApiClient.get(`/users/logout?id=${userId}`)
            return data
        } catch (e) {
            throw new Error((e as Error).message)
        }
    }
)

const usersSlice = createSlice(
  {
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder

        // REGISTRATION
        .addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as IUserError[];
        })
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
        })

        // SIGN IN
        .addCase(signInUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        })
        .addCase(signInUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as IUserError[];
        })
        .addCase(signInUser.pending, (state) => {
            state.loading = true;
        })

        // VALIDATE TOKEN
        .addCase(validateToken.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        })
        .addCase(validateToken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error as Error;
        })
        .addCase(validateToken.pending, (state) => {
            state.loading = true;
        })

        // LOGOUT
        .addCase(logout.fulfilled, (state) => {
            state.user = null
            localStorage.clear()
            state.loading = false;
        })
        .addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error as Error;
        })
        .addCase(logout.pending, (state) => {
            state.user = null
            state.loading = true;
        })
    },
  }
)

export default usersSlice.reducer;
