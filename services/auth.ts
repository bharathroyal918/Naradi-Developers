// services/auth.ts — API-Ready Mock Authentication Service Layer

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'nri';
  token: string;
  isVerified: boolean;
  avatar?: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: AuthUser;
  token?: string;
  redirectUrl?: string;
}

const simulateDelay = (ms: number = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  // Buyer Login
  async loginBuyer(credentials: { email: string; password: string; rememberMe?: boolean }): Promise<AuthResponse> {
    await simulateDelay();
    if (credentials.email.includes('error')) {
      return { success: false, message: 'Invalid email or password. Please verify your credentials.' };
    }
    const user: AuthUser = {
      id: 'buyer-001',
      name: 'Ramesh Kumar',
      email: credentials.email,
      role: 'buyer',
      token: 'mock-jwt-buyer-' + Date.now(),
      isVerified: true,
      phone: '+91 98765 43210',
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('naradi_auth_user', JSON.stringify(user));
      localStorage.setItem('naradi_token', user.token);
    }
    return {
      success: true,
      message: 'Welcome back, Buyer!',
      user,
      token: user.token,
      redirectUrl: '/buyer-portal',
    };
  },

  // Buyer Register
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async registerBuyer(data: any): Promise<AuthResponse> {
    await simulateDelay();
    if (data.email?.includes('exists')) {
      return { success: false, message: 'An account with this email already exists. Please login instead.' };
    }
    const user: AuthUser = {
      id: 'buyer-' + Date.now(),
      name: data.fullName || 'New Buyer',
      email: data.email,
      role: 'buyer',
      token: 'mock-jwt-buyer-' + Date.now(),
      isVerified: false,
      phone: data.mobileNumber || data.mobile,
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('naradi_auth_user', JSON.stringify(user));
      localStorage.setItem('naradi_token', user.token);
    }
    return {
      success: true,
      message: 'Account created successfully. Please verify your email.',
      user,
      token: user.token,
      redirectUrl: '/auth/verify-email',
    };
  },

  // Seller Login
  async loginSeller(credentials: { email: string; password: string; rememberMe?: boolean }): Promise<AuthResponse> {
    await simulateDelay();
    if (credentials.email.includes('error')) {
      return { success: false, message: 'Invalid seller credentials. Please verify your email & password.' };
    }
    const user: AuthUser = {
      id: 'seller-001',
      name: 'G.R Narendra Reddy',
      email: credentials.email,
      role: 'seller',
      token: 'mock-jwt-seller-' + Date.now(),
      isVerified: true,
      phone: '+91 98765 43211',
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('naradi_auth_user', JSON.stringify(user));
      localStorage.setItem('naradi_token', user.token);
    }
    return {
      success: true,
      message: 'Login successful. Welcome to Seller Dashboard.',
      user,
      token: user.token,
      redirectUrl: '/seller-portal',
    };
  },

  // Seller Register
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async registerSeller(data: any): Promise<AuthResponse> {
    await simulateDelay(1000);
    const user: AuthUser = {
      id: 'seller-' + Date.now(),
      name: data.fullName || 'New Partner',
      email: data.email,
      role: 'seller',
      token: 'mock-jwt-seller-' + Date.now(),
      isVerified: false,
      phone: data.mobileNumber || data.mobile,
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('naradi_auth_user', JSON.stringify(user));
      localStorage.setItem('naradi_token', user.token);
    }
    return {
      success: true,
      message: 'Seller registration submitted for verification.',
      user,
      token: user.token,
      redirectUrl: '/sellers',
    };
  },

  // NRI Login
  async loginNRI(credentials: { email: string; password: string; rememberMe?: boolean }): Promise<AuthResponse> {
    await simulateDelay();
    if (credentials.email.includes('error')) {
      return { success: false, message: 'Invalid credentials. Please verify your NRI account details.' };
    }
    const user: AuthUser = {
      id: 'nri-001',
      name: 'Priya Subramaniam',
      email: credentials.email,
      role: 'nri',
      token: 'mock-jwt-nri-' + Date.now(),
      isVerified: true,
      phone: '+65 9123 4567',
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('naradi_auth_user', JSON.stringify(user));
      localStorage.setItem('naradi_token', user.token);
    }
    return {
      success: true,
      message: 'Welcome to Naradi NRI Global Services.',
      user,
      token: user.token,
      redirectUrl: '/nri-services',
    };
  },

  // NRI Register
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async registerNRI(data: any): Promise<AuthResponse> {
    await simulateDelay(900);
    const user: AuthUser = {
      id: 'nri-' + Date.now(),
      name: data.fullName || 'Global Investor',
      email: data.email,
      role: 'nri',
      token: 'mock-jwt-nri-' + Date.now(),
      isVerified: false,
      phone: data.mobileNumber || data.mobile,
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('naradi_auth_user', JSON.stringify(user));
      localStorage.setItem('naradi_token', user.token);
    }
    return {
      success: true,
      message: 'NRI account initialized. A relationship manager will be assigned.',
      user,
      token: user.token,
      redirectUrl: '/nri/login',
    };
  },

  // Forgot Password
  async forgotPassword(email: string): Promise<AuthResponse> {
    await simulateDelay(700);
    if (!email) return { success: false, message: 'Email is required.' };
    return { success: true, message: `A 6-digit OTP has been dispatched to ${email}.` };
  },

  // Verify OTP (accepts either (otp: string) or (email: string, otp: string))
  async verifyOTP(emailOrOtp: string, maybeOtp?: string): Promise<AuthResponse> {
    await simulateDelay(600);
    const code = maybeOtp !== undefined ? maybeOtp : emailOrOtp;
    if (code === '000000') {
      return { success: false, message: 'The OTP entered has expired. Please request a new one.' };
    }
    if (code.length !== 6) {
      return { success: false, message: 'Please enter a valid 6-digit OTP.' };
    }
    return { success: true, message: 'OTP verified successfully.' };
  },

  // Reset Password (accepts either ({ newPassword }) or (email: string, password: string))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async resetPassword(emailOrData: any, maybePassword?: string): Promise<AuthResponse> {
    await simulateDelay(800);
    const password = maybePassword || emailOrData?.newPassword || emailOrData?.password;
    if (!password || password.length < 8) {
      return { success: false, message: 'Password must be at least 8 characters long.' };
    }
    return { success: true, message: 'Your password has been updated securely.' };
  },

  // Verify Email
  async verifyEmail(email?: string): Promise<AuthResponse> {
    await simulateDelay(700);
    return { success: true, message: `A fresh verification link has been sent to ${email || 'your email'}.` };
  },

  // Complete Profile
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async completeProfile(data: any): Promise<AuthResponse> {
    await simulateDelay(900);
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('naradi_auth_user');
      if (stored) {
        try {
          const user = JSON.parse(stored);
          const updated = { ...user, isProfileComplete: true, ...data };
          localStorage.setItem('naradi_auth_user', JSON.stringify(updated));
        } catch {
          // ignore
        }
      }
    }
    return { success: true, message: 'Profile completed successfully!', redirectUrl: '/buyer-portal' };
  },

  // Session Helpers
  getCurrentUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('naradi_auth_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('naradi_auth_user');
      localStorage.removeItem('naradi_token');
    }
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('naradi_token');
  },
};
