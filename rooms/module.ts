import ciscospark from 'ciscospark/es6';

export async function list(accessToken : string) : Promise<any> {
    const ciscospark2 = ciscospark.init({
      credentials: { access_token: accessToken }
    });
    const rooms = await ciscospark2.rooms.list();
    return rooms.items;
}

export async function members(accessToken : string, roomId : String) : Promise<any> {
    const ciscospark2 = ciscospark.init({
      credentials: { access_token: accessToken }
    });
    const memberships = await ciscospark2.memberships.list({roomId: roomId});
    return memberships.items;
}
