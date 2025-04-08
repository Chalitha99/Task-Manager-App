package com.Assesment.Task.Manager.App.Model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RegistrationResponse {

    @JsonProperty("message")
    private String message;

    public RegistrationResponse(String message) {
        this.message = message;

    }

    public String getMessage() {
        return message;
    }
}

