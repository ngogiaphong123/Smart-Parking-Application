const handleAxiosError = (error: any) => {
    if (Array.isArray(error.response.data.errors)) {
        let errorMessage = "";
        error.response.data.errors.map((item: any) => {
            errorMessage += item.message;
            errorMessage += ", ";
            return item.message;
        });
        return { status: "Error", message: errorMessage };
    } else {
        return { status: "Error", message: error.response.data.message };
    }
}

export default handleAxiosError;