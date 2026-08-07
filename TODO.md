# TODO - Fix Email Credentials Loading

## Steps
- [x] Fix `backend/server.js` - Load `.env` explicitly via `path.join(__dirname, '.env')`
- [x] Fix `backend/routes/admin.js` - Move EMAIL_USER/EMAIL_PASS check before creating transporter
- [x] Verify credentials exist in `backend/.env` (already confirmed present)
- [x] Restart backend server and test Auto-Reply email flow (verified env vars load: EMAIL_USER=vishwajeetbankingpoint@gmail.com, EMAIL_PASS 16-char App Password)

