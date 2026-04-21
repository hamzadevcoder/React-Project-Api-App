import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password_hash: { type: String, required: true },
    email_verified: { type: Boolean, default: false },
    verification_code: { type: String, default: null },
    verification_code_expires_at: { type: Date, default: null },
    facebook_access_token: { type: String, default: null },
    facebook_user_id: { type: String, default: null },
    facebook_profile: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const User = mongoose.model('User', userSchema);

export default User;
