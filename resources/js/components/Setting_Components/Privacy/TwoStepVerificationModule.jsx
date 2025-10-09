import React, { useState } from "react";
import { useAuth } from '../../../AuthContext/AuthContext';
import '../../../../css/TwoStepModule.css';

export default function TwoStepVerificationModule({ handleClose }) {

    const [step, setStep] = useState(1);
    const [method, setMethod] = useState('email');
    const [code, setCode] = useState('');
    const { user } = useAuth();
    const [userTwoStepDate, setUserTwoStepData] = useState({
        userPhone: user.user.user_phone, userEmail: user.user.user_email
    })

    return (
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title w-full text-center">
                            {step === 1 && 'فعالسازی رمز عبور دو مرحله ای'}
                            {step === 2 && 'انتخاب روش دریافت کد'}
                            {step === 3 && 'وارد کردن کد تایید'}
                            {step === 4 && 'فعالسازی موفق!'}
                        </h5>
                        <button type="button" className="btn-close" onClick={handleClose} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            step === 1 && (
                                <div className="d-flex flex-column">
                                    <p className="text-muted mb-4 text-center">
                                        با فعالسازی ورود دو مرحله ای امنیت حساب شما افزایش پیدا می کند. در هر بار ورود علاوه بر رمز عبور، شما باید کدی که برایتان ارسال می شود را وارد کنید.
                                    </p>
                                    <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>ادامه</button>
                                </div>

                            )
                        }

                        {
                            step === 2 && (
                                <div>
                                    <p className="fw-bold text-center">
                                        روش دریافت کد را انتخاب کنید
                                    </p>
                                    <div class="form-check mt-2">
                                        <input class="form-check-input" type="radio" name="method" id="emailMethod" checked={method === 'email'} value="email" onChange={(e) => setMethod(e.target.value)} />
                                        <label class="form-check-label" for="emailMethod">
                                            ایمیل
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="method" value='sms' id="smsMethod" checked={method === 'sms'} onChange={(e) => setMethod(e.target.value)} />
                                        <label class="form-check-label" for="smsMethod">
                                            پیامک
                                        </label>
                                    </div>

                                    <div className="d-flex justify-content-evenly mt-4">
                                        <button type="button" className="btn btn-secondary" onClick={() => setStep(1)} >بازگشت</button>
                                        <button type="button" className="btn btn-primary" onClick={() => setStep(3)} >ارسال کد</button>
                                    </div>
                                </div>
                            )
                        }

                        {
                            step === 3 && (
                                <div>
                                    <p className="text-center text-muted two-step-direction">
                                        لطفا کد ارسال شده به <span className="text-primary">{method == 'email' ? userTwoStepDate.userEmail : userTwoStepDate.userPhone}</span> را وارد کنید.
                                    </p>

                                    <div className="mb-3">
                                        <label for="verifyCode" className="form-label">کد تایید: </label>
                                        <input type="text" className="form-control" id="verifyCode" placeholder="لطفا کد تایید را وارد کنید..." value={code} onChange={(e) => setCode(e.target.value)} maxLength={6} />
                                        <div className="form-text text-center">
                                            کاربر گرامی لطفا کد تایید 6 رقمی را در فیلد بالا وارد کنید
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-evenly mt-4">
                                        <button type="button" className="btn btn-secondary" onClick={() => setStep(2)} >بازگشت</button>
                                        <button type="button" className="btn btn-primary" onClick={() => setStep(4)} >تایید</button>
                                    </div>
                                </div>
                            )
                        }

                        {
                            step === 4 && (
                                <div className="text-center py-4">
                                    <div className="fs-1 text-success mb-3">✅</div>
                                    <h5 className="text-success fs-1 mb-3">فعالسازی با موفقیت انجام شد</h5>
                                    <p className="text-muted mt-2">
                                        از این پس هنگام ورود به حساب خود علاوه بر رمز عبور، باید کد تایید ارسال شده به {method == 'email' ? 'ایمیل' : 'تلفن همراه'} خود را وارد کنید
                                    </p>
                                    <button type="button" className="btn btn-secondary" onClick={handleClose} data-bs-dismiss="modal">Close</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}