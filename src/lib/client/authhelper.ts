import { SupabaseClient } from "@supabase/supabase-js";

export enum TiqrUserType {
    GUEST,
    HOST
}

export async function determineUserType(supabaseClient: SupabaseClient, userId: string): Promise<TiqrUserType> {
    const user = await supabaseClient.from('users').select('is_host').eq('id', userId).single();

    if(user.error) {
        throw user.error;
    }

    else {
        const type = user.data.is_host ? TiqrUserType.HOST : TiqrUserType.GUEST;
        return type
    }
}