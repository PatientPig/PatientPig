package com.example.patientpig.global.error.exception;

import lombok.Getter;

@Getter
public class PatientPigException extends RuntimeException {

    private final ErrorCode errorCode;
    private final String message;

    public PatientPigException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
        this.message = errorCode.getMessage();
    }

    public PatientPigException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
        this.message = message;
    }
}