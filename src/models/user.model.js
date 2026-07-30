const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [EMAIL_REGEX, "Please enter a valid email address"]
        },

        role: {
            type: String,
            enum: ["admin", "organizer", "attendee"],
            default: "attendee"
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            select: false
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                delete ret.password;
                delete ret.__v;
                return ret;
            }
        },
        toObject: {
            transform: (doc, ret) => {
                delete ret.password;
                delete ret.__v;
                return ret;
            }
        }
    },
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        next();
    } catch (error) {
        next(error);
    }
});

userSchema.pre(/^findOneAndUpdate/, async function (next) {
    const update = this.getUpdate() || {};
    const password = update.password || update.$set?.password;

    if (!password) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (update.password) {
            update.password = hashedPassword;
        }

        if (update.$set?.password) {
            update.$set.password = hashedPassword;
        }

        this.setUpdate(update);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    if (!this.password) {
        throw new Error("Password is not available on this user document. Use .select('+password').");
    }

    return bcrypt.compare(enteredPassword, this.password);

};

userSchema.methods.generateAccessToken = function () {

    return jwt.sign(
        {
            id: this._id,
            role: this.role,
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRE || "15m",
        }
    );

};

userSchema.methods.generateRefreshToken = function () {

    return jwt.sign(
        {
            id: this._id,
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRE || "7d",
        }
    );

};

module.exports = mongoose.model("User", userSchema);
