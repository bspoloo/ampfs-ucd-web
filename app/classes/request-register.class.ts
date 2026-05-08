import { Profile } from "next-auth";
import { SyncUserResponse } from "../interfaces/auth/syn-user-response.interface";
import { SyncUserRequestService } from "../services/auth.service";
import { ACTIONS } from "../enums/actions.enum";

export class RequestRegister {
    static getActionRegister(action: ACTIONS, profile: Profile) {
        console.log("creando", profile);
        
        if (action === ACTIONS.LOGIN) {
            return SyncUserRequestService.syncUserRequestEmail(profile);
        } else if (action === ACTIONS.REGISTER) {
            return SyncUserRequestService.syncUserRequestEmailRegistry(profile);
        } else {
            return null;
        }
    }
}