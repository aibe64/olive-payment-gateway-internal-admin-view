import { State } from "../../models/application/state";
import { Encription } from "../../shared/functions/encryption";
export class MerchantUserState {

    static OpenEditModal(state: State.MerchantUserPage) {
        state.isEdit = true;
        state.loading = false;
        state.showModal = true;
        state.openAlertModal = false;
        state.message = "";
        state.userRequest = {
            ...state.userRequest,
            firstName: state.userResponse.firstName,
            lastName: state.userResponse.lastName,
            phoneNumber: state.userResponse.phoneNumber,
            email: state.userResponse.email,
            roleId: state.userResponse.roleId,
            roleName: state.userResponse.userRole?.description,
            userId: state.userResponse.userId
        }
        return state;
    }
    static OpenCreateModal(state: State.MerchantUserPage) {
        state.isEdit = false;
        state.isError = false;
        state.showModal = true;
        state.errorMessage = "";
        let data: any = JSON.parse(
            Encription.decrypt(localStorage.getItem("***********") as string)
        );
        const token = data.token;
        const appKey = data.appKey;
        state.userRequest = {
            ...state.userRequest,
            email: "", token, appKey, address: "."
        }
        return state;
    }
    static SetLoading(state: State.MerchantUserPage) {
        state.loading = true;
        return state;
    }
    static SetModal(state: State.MerchantUserPage) {
        state.showModal = false;
        return state;
    }
    static SetUser(state: State.MerchantUserPage){
        return state;
    }

}