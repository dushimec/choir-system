import TokenAuthenticator from '../helpers/TokenAuthenticator';
import { Singer } from '../models/singer';
import { User } from '../models/user.model';

const registerSinger = async ({ name, phone }) => {
    const user = new User({ name, phone, role: 'singer' });
    await user.save();

    const singer = new Singer({ name, phone, user: user._id });
    await singer.save();

    return singer;
};

const loginSinger = async (phone) => {
    const singer = await Singer.findOne({ phone });
    if (!singer) {
        throw new Error('Invalid phone number or role');
    }

    const token = TokenAuthenticator.signToken({
        _id: singer._id,
        role: 'singer',
        name: singer.name,
        phone: singer.phone
    });

    return { token, user: singer };
};

export { registerSinger,loginSinger };
