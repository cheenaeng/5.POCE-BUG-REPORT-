import jsSHA from "jssha";
const SALT = 'bananas';
export default function initUsersController(db) {
  const addUser = async (request, response) => {
    try {
      const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
      shaObj.update(request.body.password);
      const hashedPassword = shaObj.getHash('HEX');

      const user = await db.User.create({
        email: request.body.email, 
        password : hashedPassword
      });
      response.send({ user });
    } catch (error) {
      console.log(error);
    }
  };

   const getUser = async (request, response) => {
    try {
      const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
      shaObj.update(request.body.password);
      const hashedPassword = shaObj.getHash('HEX');
      console.log(hashedPassword)

      const user = await db.User.findOne({
       where:{
         email:request.body.email,
         password: hashedPassword
       }
      });
      console.log(user)
      const shaObj2 = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
      const unhashedCookieString = `${user.id}-${SALT}`
      shaObj.update(unhashedCookieString);
      const hashedCookieString = shaObj2.getHash('HEX');

      response.cookie('loggedInHash', hashedCookieString)
      response.cookie('userId',user.id)
    
      response.send({ user });
      
     
    } catch (error) {
      console.log(error);
    }
  };

  return {addUser, getUser}
}