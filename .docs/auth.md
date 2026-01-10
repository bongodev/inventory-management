# Authentication Flow Diagram

## 1. Registration Flow

```
┌─────────────┐                                    ┌─────────────┐
│   Browser   │                                    │   Express   │
│  (React UI) │                                    │   Server    │
└──────┬──────┘                                    └──────┬──────┘
       │                                                  │
       │  POST /api/auth/register                         │
       │  { email, password }                             │
       ├─────────────────────────────────────────────────>│
       │                                                  │
       │                                                  │ Hash password
       │                                                  │ (bcrypt)
       │                                                  │
       │                                                  │ Generate UUID
       │                                                  │
       │                                                  │ Generate API Key
       │                                                  │ sk_[64-hex-chars]
       │                                                  │
       │                                                  │ Generate verification
       │                                                  │ token (32 bytes)
       │                                                  │
       │                                                  │ Store user:
       │                                                  │ {
       │                                                  │   id, email,
       │                                                  │   hashed_password,
       │                                                  │   apiKey,
       │                                                  │   emailVerified: false,
       │                                                  │   verificationToken,
       │                                                  │   firstLogin: true
       │                                                  │ }
       │                                                  │
       │  { userId, message }                             │
       │<─────────────────────────────────────────────────┤
       │                                                  │
       │  Display success message                         │
       │  Switch to login tab                             │
       │                                                  │
```

## 2. Login Flow

```
┌─────────────┐                  ┌──────────────┐                  ┌─────────────┐
│   Browser   │                  │   Passport   │                  │   Express   │
│  (React UI) │                  │  Middleware  │                  │   Server    │
└──────┬──────┘                  └──────┬───────┘                  └──────┬──────┘
       │                                │                                 │
       │  POST /api/auth/login          │                                 │
       │  { email, password }           │                                 │
       ├───────────────────────────────>│                                 │
       │                                │                                 │
       │                                │  Find user by email             │
       │                                ├────────────────────────────────>│
       │                                │                                 │
       │                                │  Return user object             │
       │                                │<────────────────────────────────┤
       │                                │                                 │
       │                                │ Compare password                │
       │                                │ bcrypt.compare(                 │
       │                                │   input, stored_hash            │
       │                                │ )                               │
       │                                │                                 │
       │                                │ If valid:                       │
       │                                │   Create session                │
       │                                │   Store user.id in session      │
       │                                │                                 │
       │  Set-Cookie: session_id        │                                 │
       │<───────────────────────────────┤                                 │
       │                                │                                 │
       │  { user: {...}, message }      │                                 │
       │  (without password)            │                                 │
       │<───────────────────────────────┤                                 │
       │                                │                                 │
       │  Store user in React state     │                                 │
       │  Redirect to dashboard         │                                 │
       │                                │                                 │
```

## 3. Authenticated Request Flow

```
┌─────────────┐                  ┌──────────────┐                  ┌─────────────┐
│   Browser   │                  │   Passport   │                  │   Express   │
│  (React UI) │                  │  Middleware  │                  │   Server    │
└──────┬──────┘                  └──────┬───────┘                  └──────┬──────┘
       │                                │                                 │
       │  GET /api/auth/me              │                                 │
       │  Cookie: session_id            │                                 │
       ├───────────────────────────────>│                                 │
       │                                │                                 │
       │                                │ Deserialize session             │
       │                                │ Get user.id from session        │
       │                                │                                 │
       │                                │ Load user from database         │
       │                                ├────────────────────────────────>│
       │                                │                                 │
       │                                │ Return user object              │
       │                                │<────────────────────────────────┤
       │                                │                                 │
       │                                │ Attach to req.user              │
       │                                │                                 │
       │                                │ Check isAuthenticated()         │
       │                                ├────────────────────────────────>│
       │                                │                                 │
       │                                │ Execute route handler           │
       │                                │                                 │
       │  { user: {...} }               │                                 │
       │<──────────────────────────────────────────────────────────────────┤
       │                                │                                 │
```

## 4. Email Verification Flow

```
┌─────────────┐                                    ┌─────────────┐
│   Browser   │                                    │   Express   │
│  (React UI) │                                    │   Server    │
└──────┬──────┘                                    └──────┬──────┘
       │                                                  │
       │ User clicks "Send Verification Email"            │
       │                                                  │
       │  POST /api/auth/send-verification                │
       │  Cookie: session_id                              │
       ├─────────────────────────────────────────────────>│
       │                                                  │
       │                                                  │ Check authentication
       │                                                  │
       │                                                  │ Get user from session
       │                                                  │
       │                                                  │ Check if already verified
       │                                                  │
       │                                                  │ [In Production]
       │                                                  │ Send email with token
       │                                                  │ 
       │                                                  │ [In Development]
       │  { message, token }                              │ Return token in response
       │<─────────────────────────────────────────────────┤
       │                                                  │
       │  Display token in UI                             │
       │  (also logged to console)                        │
       │                                                  │
       │ User copies token and pastes                     │
       │                                                  │
       │  POST /api/auth/verify-email                     │
       │  { token }                                       │
       │  Cookie: session_id                              │
       ├─────────────────────────────────────────────────>│
       │                                                  │
       │                                                  │ Get user from session
       │                                                  │
       │                                                  │ Compare tokens:
       │                                                  │ user.verificationToken
       │                                                  │ === request.token
       │                                                  │
       │                                                  │ If match:
       │                                                  │   emailVerified = true
       │                                                  │   verificationToken = null
       │                                                  │
       │  { message: "Email verified" }                   │
       │<─────────────────────────────────────────────────┤
       │                                                  │
       │  Update UI state                                 │
       │  Show success message                            │
       │                                                  │
```

## 5. Password Update Flow

```
┌─────────────┐                                    ┌─────────────┐
│   Browser   │                                    │   Express   │
│  (React UI) │                                    │   Server    │
└──────┬──────┘                                    └──────┬──────┘
       │                                                  │
       │ User fills password form:                        │
       │ - Current password                               │
       │ - New password                                   │
       │ - Confirm new password                           │
       │                                                  │
       │ Client-side validation:                          │
       │ newPassword === confirmPassword                  │
       │                                                  │
       │  POST /api/auth/update-password                  │
       │  {                                               │
       │    currentPassword,                              │
       │    newPassword                                   │
       │  }                                               │
       │  Cookie: session_id                              │
       ├─────────────────────────────────────────────────>│
       │                                                  │
       │                                                  │ Check authentication
       │                                                  │
       │                                                  │ Get user from session
       │                                                  │
       │                                                  │ Verify current password:
       │                                                  │ bcrypt.compare(
       │                                                  │   currentPassword,
       │                                                  │   user.password
       │                                                  │ )
       │                                                  │
       │                                                  │ If invalid:
       │  { error: "Current password incorrect" }         │   return error
       │<─────────────────────────────────────────────────┤
       │                                                  │
       │                                                  │ If valid:
       │                                                  │   Hash new password
       │                                                  │   user.password = hash
       │                                                  │   firstLogin = false
       │                                                  │
       │  { message: "Password updated" }                 │
       │<─────────────────────────────────────────────────┤
       │                                                  │
       │  Clear form                                      │
       │  Show success message                            │
       │  Update user state                               │
       │                                                  │
```

## 6. Session Management

```
┌──────────────────────────────────────────────────────────────┐
│                     Session Lifecycle                        │
└──────────────────────────────────────────────────────────────┘

Login
  │
  ├──> Create Session
  │      │
  │      ├──> Generate session ID
  │      ├──> Store session data:
  │      │      {
  │      │        passport: {
  │      │          user: user.id
  │      │        }
  │      │      }
  │      └──> Set cookie: connect.sid=[session_id]
  │
  v
Authenticated Requests
  │
  ├──> Read session cookie
  │      │
  │      ├──> Deserialize user from session.passport.user
  │      │      │
  │      │      └──> Load full user object from database
  │      │
  │      └──> Attach to req.user
  │
  v
Logout
  │
  └──> Destroy session
         │
         ├──> req.logout()
         ├──> Clear session data
         └──> Clear cookie
```

## 7. Complete User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                    First-Time User Flow                         │
└─────────────────────────────────────────────────────────────────┘

    [Start]
       │
       v
  ┌─────────┐
  │Register │ ──> Email + Password
  └────┬────┘
       │
       │ System generates:
       │ • User ID (UUID)
       │ • API Key (sk_...)
       │ • Verification Token
       │ • Hashed Password
       │
       v
   [Created]
       │
       │ emailVerified: false
       │ firstLogin: true
       │
       v
  ┌─────────┐
  │  Login  │ ──> Authenticate with credentials
  └────┬────┘
       │
       v
  ┌───────────┐
  │ Dashboard │
  └─────┬─────┘
       │
       ├──> View API Key (hidden by default)
       │
       ├──> Email Verification
       │       │
       │       ├──> Send verification email
       │       ├──> Receive token
       │       └──> Verify email
       │              │
       │              └──> emailVerified: true
       │
       └──> Update Password
               │
               ├──> Enter current password
               ├──> Enter new password
               └──> Confirm new password
                      │
                      └──> firstLogin: false
                      
    [Fully Set Up]
```

## Security Features

```
┌──────────────────────────────────────────────────────────────┐
│                      Security Layers                         │
└──────────────────────────────────────────────────────────────┘

Password Security:
├─ bcrypt hashing (10 rounds)
├─ Salt automatically generated
└─ One-way encryption (cannot be reversed)

Session Security:
├─ Secure session ID generation
├─ HTTPOnly cookies (JavaScript cannot access)
├─ Session expiration
└─ CSRF protection via session

API Key Security:
├─ Cryptographically random (32 bytes)
├─ Unique per user
├─ 64-character hex string
└─ Prefix: sk_ for easy identification

Token Security:
├─ Verification tokens (32 bytes random)
├─ One-time use
├─ Deleted after verification
└─ Server-side validation only
```