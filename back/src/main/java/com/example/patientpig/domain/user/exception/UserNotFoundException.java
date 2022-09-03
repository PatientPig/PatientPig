package com.example.patientpig.domain.user.exception;

import com.example.patientpig.global.error.exception.ErrorCode;
import com.example.patientpig.global.error.exception.PatientPigException;

public class UserNotFoundException extends PatientPigException {

    public static final UserNotFoundException EXCEPTION = new UserNotFoundException();

    public UserNotFoundException() {
        super(ErrorCode.USER_NOT_FOUND);
    }
}
