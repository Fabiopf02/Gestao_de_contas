import Realm from 'realm';

import CardSchema from '../schemas/CardSchema';
import ItemSchema from '../schemas/ItemSchema';
import UserSchema from '../schemas/UserSchema';

export default function getRealm() {
  return Realm.open({
    schema: [ItemSchema, CardSchema, UserSchema],
    deleteRealmIfMigrationNeeded: true,
  });
}
