import ciscospark from 'ciscospark/es6';

export async function sendMessage(accessToken : string, personId : string , message : string ) : Promise<any> {
    const ciscospark2 = ciscospark.init({
      credentials: { access_token: accessToken }
    });
    return await ciscospark2.messages.create({toPersonId : personId, text : message});
}

export async function deleteMessage(accessToken : string, messageId : string) : Promise<any> {
    const ciscospark2 = ciscospark.init({
      credentials: { access_token: accessToken }
    });
    return await ciscospark2.messages.delete(messageId);
}
