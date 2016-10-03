import ciscospark from 'ciscospark/es6';

export async function personDetails(accessToken : string, personId) : Promise<any> {
    const ciscospark2 = ciscospark.init({
      credentials: { access_token: accessToken }
    });
    return await ciscospark2.people.get(personId);
}
