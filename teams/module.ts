import ciscospark from 'ciscospark/es6';

export async function list(accessToken : string) : Promise<any> {
    const ciscospark2 = ciscospark.init({
      credentials: { access_token: accessToken }
    });
    const teams = await ciscospark2.teams.list();
    return teams.items;
}

export async function members(accessToken : string, teamId : String) : Promise<any> {
    const ciscospark2 = ciscospark.init({
      credentials: { access_token: accessToken }
    });
    const memberships = await ciscospark2.teamMemberships.list({teamId: teamId});
    return memberships.items;
}
