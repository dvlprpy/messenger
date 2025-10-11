import { react, useState } from 'react'


export default function LocalPassword({ handleClose }) {

    const [step, setStep] = useState(1);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [autoLockTime, setAutoLockTime] = useState("5m");

    let header, body, footer;

    // ----------------------------------------
    // مرحله 1: معرفی ویژگی رمز محلی
    // ----------------------------------------
    if (step === 1) {
        header = (
            <>
                <h5 className="modal-title">رمز محلی</h5>
                <button type="button" className="btn-close" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close"></button>
            </>
        );
        body = (
            <div>
                <p className="text-muted text-center">
                    با فعال کردن رمز محلی، می‌توانید پیام‌رسان را با رمز محافظت کنید.
                </p>
                <p className="text-muted text-center">
                    در صورت فعال بودن، هنگام باز کردن برنامه باید رمز عبور را وارد کنید.
                </p>
            </div>
        );
        footer = (
            <>
                <button className="btn btn-secondary" onClick={handleClose}>
                    بستن
                </button>
                <button className="btn btn-primary" onClick={() => setStep(2)}>
                    ادامه
                </button>
            </>
        );
    }

    // ----------------------------------------
    // مرحله 2: تعیین رمز عبور
    // ----------------------------------------
    if (step === 2) {
        header = (
            <>
                <h5 className="modal-title">تنظیم رمز عبور</h5>
                <button type="button" className="btn-close" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close"></button>
            </>
        );
        body = (
            <div className='direction-rtl'>
                <p>لطفاً رمز عبور دلخواه خود را وارد کنید:</p>
                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="رمز عبور جدید"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <p>تأیید رمز عبور:</p>
                <input
                    type="password"
                    className="form-control"
                    placeholder="تکرار رمز عبور"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
        );
        footer = (
            <>
                <button className="btn btn-secondary" onClick={() => setStep(1)}>
                    بازگشت
                </button>
                <button
                    className="btn btn-primary"
                    disabled={!password || password !== confirmPassword}
                    onClick={() => setStep(3)}
                >
                    ادامه
                </button>
            </>
        );
    }

    // ----------------------------------------
    // مرحله 3: تنظیم قفل خودکار
    // ----------------------------------------
    if (step === 3) {
        header = (
            <>
                <h5 className="modal-title">قفل خودکار برنامه</h5>
                <button type="button" className="btn-close" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close"></button>
            </>
        );
        body = (
            <div className='direction-rtl'>
                <p>پس از چه مدت زمان بدون فعالیت، برنامه قفل شود؟</p>
                <select
                    className="form-select"
                    value={autoLockTime}
                    onChange={(e) => setAutoLockTime(e.target.value)}
                >
                    <option value="1m">۱ دقیقه</option>
                    <option value="5m">۵ دقیقه</option>
                    <option value="10m">۱۰ دقیقه</option>
                    <option value="30m">۳۰ دقیقه</option>
                    <option value="never">هرگز</option>
                </select>

                <div className="form-check mt-4 form-check-reverse">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="disableLock"
                        onChange={(e) => {
                            if (e.target.checked) setAutoLockTime("never");
                        }}
                    />
                    <label className="form-check-label" htmlFor="disableLock">
                        غیرفعال‌سازی قفل خودکار
                    </label>
                </div>
            </div>
        );
        footer = (
            <>
                <button className="btn btn-secondary" onClick={() => setStep(2)}>
                    بازگشت
                </button>
                <button className="btn btn-primary" onClick={() => setStep(4)}>
                    ذخیره
                </button>
            </>
        );
    }

    // ----------------------------------------
    // مرحله 4: تأیید نهایی
    // ----------------------------------------
    if (step === 4) {
        header = (
            <>
                <h5 className="modal-title text-success">رمز محلی فعال شد ✅</h5>
                <button type="button" className="btn-close" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close"></button>
            </>
        );
        body = (
            <div className="text-center direction-rtl">
                <p>رمز عبور شما با موفقیت تنظیم شد.</p>
                <p className="text-muted">
                    زمان قفل خودکار:{" "}
                    <strong>{autoLockTime === "never" ? "غیرفعال" : autoLockTime == '1m' ? "1 دقیقه" : autoLockTime == '5m' ? '5 دقیقه' : autoLockTime == '10m' ? '10 دقیقه' : autoLockTime == '30m' ? 'نیم ساعت' : ''}</strong>
                </p>
            </div>
        );
        footer = (
            <button className="btn btn-success" onClick={handleClose}>
                بستن
            </button>
        );
    }

    return { header, body, footer, handleClose }
}