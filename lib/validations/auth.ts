import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, 'Email address is required')
  .email('Please enter a valid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character');

export const phoneSchema = z
  .string()
  .min(10, 'Mobile number must be at least 10 digits')
  .regex(/^[0-9+\-\s()]+$/, 'Please enter a valid mobile number');

// ===== BUYER SCHEMAS =====
export const buyerLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export type BuyerLoginInput = z.infer<typeof buyerLoginSchema>;
export type BuyerLoginFormValues = BuyerLoginInput;

export const buyerRegisterSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    mobileNumber: phoneSchema.optional(),
    mobile: phoneSchema.optional(),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    state: z.string().min(1, 'Please select your state'),
    city: z.string().min(1, 'Please enter your city'),
    propertyType: z.string().optional(),
    propertyInterest: z.string().optional(),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the Terms & Privacy Policy',
    }),
    subscribeAlerts: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type BuyerRegisterInput = z.infer<typeof buyerRegisterSchema>;
export type BuyerRegisterFormValues = BuyerRegisterInput;

// ===== SELLER SCHEMAS =====
export const sellerLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export type SellerLoginInput = z.infer<typeof sellerLoginSchema>;
export type SellerLoginFormValues = SellerLoginInput;

export const sellerStep1Schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  mobileNumber: phoneSchema.optional(),
  mobile: phoneSchema.optional(),
  email: emailSchema,
  password: passwordSchema,
});

export const sellerStep2Schema = z.object({
  sellerType: z.string().min(1, 'Please select a seller type'),
  companyName: z.string().optional(),
  gstNumber: z.string().optional(),
});

export const sellerStep3Schema = z.object({
  state: z.string().min(1, 'State is required'),
  district: z.string().min(1, 'District is required'),
  city: z.string().min(1, 'City is required'),
  address: z.string().min(5, 'Full street address is required'),
});

export const sellerStep4Schema = z.object({
  agreeMandatoryVerification: z.boolean().refine((val) => val === true, {
    message: 'You must acknowledge mandatory verification',
  }),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept Terms & Privacy Policy',
  }),
});

export const sellerRegistrationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  mobileNumber: phoneSchema.optional(),
  mobile: phoneSchema.optional(),
  email: emailSchema,
  password: passwordSchema,
  sellerType: z.string().min(1, 'Please select a seller type'),
  companyName: z.string().optional(),
  gstNumber: z.string().optional(),
  state: z.string().min(1, 'State is required'),
  district: z.string().min(1, 'District is required'),
  city: z.string().min(1, 'City is required'),
  address: z.string().min(5, 'Full street address is required'),
  agreeMandatoryVerification: z.boolean().refine((val) => val === true, {
    message: 'You must acknowledge mandatory verification',
  }),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept Terms & Privacy Policy',
  }),
});

export const sellerFullRegisterSchema = sellerRegistrationSchema;
export type SellerRegistrationInput = z.infer<typeof sellerRegistrationSchema>;
export type SellerFullRegisterFormValues = SellerRegistrationInput;

// ===== NRI SCHEMAS =====
export const nriLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export type NRILoginInput = z.infer<typeof nriLoginSchema>;
export type NRILoginFormValues = NRILoginInput;

export const nriRegisterSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  countryOfResidence: z.string().min(1, 'Country of residence is required'),
  mobileNumber: phoneSchema.optional(),
  mobile: phoneSchema.optional(),
  email: emailSchema,
  password: passwordSchema,
  preferredInvestmentState: z.string().optional(),
  preferredState: z.string().optional(),
  purpose: z.string().min(1, 'Please select your primary purpose'),
  receiveWhatsAppUpdates: z.boolean().optional(),
  receiveWhatsApp: z.boolean().optional(),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Terms of Service',
  }),
});

export type NRIRegisterInput = z.infer<typeof nriRegisterSchema>;
export type NRIRegisterFormValues = NRIRegisterInput;

// ===== AUTH UTILITY SCHEMAS =====
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ForgotPasswordFormValues = ForgotPasswordInput;

export const resetPasswordSchema = z
  .object({
    password: passwordSchema.optional(),
    newPassword: passwordSchema.optional(),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => {
    const p = data.password || data.newPassword;
    return p === data.confirmPassword;
  }, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ResetPasswordFormValues = ResetPasswordInput;

export const completeProfileSchema = z.object({
  avatarUrl: z.string().optional(),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  preferredLocations: z.string().min(2, 'Please enter preferred areas'),
  budgetMin: z.number().min(1),
  budgetMax: z.number().min(1),
  propertyInterests: z.array(z.string()).min(1, 'Select at least one property interest'),
  preferredCommunication: z.string().min(1, 'Select preferred communication channel'),
});

export type CompleteProfileInput = z.infer<typeof completeProfileSchema>;
export type CompleteProfileFormValues = CompleteProfileInput;
