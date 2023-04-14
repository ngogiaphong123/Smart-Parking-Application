
export const getCustomerByIdController = async (req: Request, res: Response) => {
    const accountId = res.locals.user.accountId;
    const customer = await getCustomerService(accountId);
    res.status(StatusCodes.OK).send(new ResponseBody("Success", "Get customer successfully", customer));
}