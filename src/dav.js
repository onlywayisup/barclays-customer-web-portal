const dav_props = {
    companyId: "ad3aa877-b668-4dcc-af0e-8fde97ba67d1",
    trxPolicyId: "4c05a38df3bddfaa041f91e0a829c857",
    loginPolicyId: "111fd855471761d79b2da68dcb99aaed",
    invitationPolicyId: "d45731514f5402e6a7b4c4a55124ae34",
    registrationPolicyId: "bad093dc4a60415dd5d6c3b4e443aac5",
    apiKey:
        "4778ba332292138543845bda5b5ace5c67b9670e8988bfd5bd8118702123843b06d41a6644af9d293ff9f707824a8fe8dd96dd3353e35a02740a9d11723f4a37f2ab1b0e36452119cc83140c2ea81e47c8e83b91199b23e672c5e045f890e1cb1ade6d55a8643df58e0c20ef313735229008272bbf1db1d261f464e5d314fa0b",
};

async function getToken() {
    const url =
        "https://orchestrate-api.pingone.eu/v1/company/" +
        dav_props.companyId +
        "/sdktoken";
    console.log(url);
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "X-SK-API-KEY": dav_props.apiKey,
        },
        redirect: "follow",
    });

    token = await response.json();
    console.log(token);
}

async function showWidget(
    policyId,
    successCallback,
    errorCallback,
    onCloseModal,
    parameters
) {
    let widgetConfig = {
        config: {
            method: "runFlow",
            apiRoot: "https://auth.pingone.eu/",
            accessToken: token.access_token,
            companyId: dav_props.companyId,
            policyId: policyId,
            parameters: parameters,
        },
        useModal: true,
        successCallback,
        errorCallback,
        onCloseModal,
    };

    davinci.skRenderScreen(skWidget, widgetConfig);
}
