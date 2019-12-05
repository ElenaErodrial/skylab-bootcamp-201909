require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const modifyUser = require('.')
const { random } = Math
const { errors: { NotFoundError, ConflictError, ContentError }, polyfills: { arrayRandom } } = require('upbeat-util')
const { database, ObjectId, models: { User, Links } } = require('upbeat-data')

arrayRandom()

describe('logic - modify user', () => {
    before(() => database.connect(TEST_DB_URL))

    let id, username, email, password, description, image, links, upcomings

    beforeEach(async () => {
        username = `name-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        description = `description-${random()}`
        image = `image-${random()}`
        links = {
            name: 'instagram',
            url: `links-${random()}`
        }

        const linksObj = await new Links(links)
        upcomings = `upcomings-${random()}`

        await User.deleteMany()

        const user = await User.create({ username, email, password, description, image, links: [] , upcomings })
        user.links.push(linksObj)
        id = user.id
        await user.save()
        

})

    it('should succeed on correct user and user data', async () => {
   
        const newUsername = `new-username-${random()}`
        const newEmail = `new-email-${random()}@mail.com`
        const newPassword = `new-password-${random()}`
        const newDescription = `new-description-${random()}`
        const newImage = `new-image-${random()}`
        const newUpcomings = `new-upcomings-${random()}`

        const newLinks = {
            name: 'spotify',
            url: `links-${random()}`
        }

        const newLinksObj = new Links(newLinks)
        

        const response = await modifyUser(id, newUsername, newEmail, newPassword, newDescription, newImage, newLinksObj , newUpcomings)

        expect(response).to.not.exist

        const user = await User.findById(id)   

        expect(user.id).to.equal(id)

        expect(user.username).to.exist
        expect(user.username).to.be.a('string')
        expect(user.username).to.have.length.greaterThan(0)
        expect(user.username).to.equal(newUsername)

        expect(user.email).to.exist
        expect(user.email).to.be.a('string')
        expect(user.email).to.have.length.greaterThan(0)
        expect(user.email).to.equal(newEmail)

        expect(user.password).to.exist
        expect(user.password).to.be.a('string')
        expect(user.password).to.have.length.greaterThan(0)
        expect(user.password).to.equal(newPassword)

        expect(user.description).to.exist
        expect(user.description).to.be.a('string')
        expect(user.description).to.have.length.greaterThan(0)
        expect(user.description).to.equal(newDescription)

        expect(user.image).to.exist
        expect(user.image).to.be.a('string')
        expect(user.image).to.have.length.greaterThan(0)
        expect(user.image).to.equal(newImage)

        expect(user.links).to.exist
        expect(user.links).to.be.an('array')
        expect(user.links).to.have.length.greaterThan(0)
        expect(user.links[0].url).to.equal(newLinks.url)

        expect(user.upcomings).to.exist
        expect(user.upcomings).to.be.a('string')
        expect(user.upcomings).to.have.length.greaterThan(0)
        expect(user.upcomings).to.equal(newUpcomings)


    })

    //  it('should succeed on correct user and new user data, except for username', async () => {



        
    //     const newEmail = `new-email-${random()}@mail.com`
    //     const newPassword = `new-password-${random()}`
    //     const newDescription = `new-description-${random()}`
    //     const newImage = `new-image-${random()}`
    //     const newLinks = `new-links-${random()}`
    //     const newUpcomings = `new-upcomings-${random()}`

    //     const newLinks = {
    //         name: 'spotify',
    //         url: `links-${random()}`
    //     }

    //     const newLinksObj = new Links(newLinks)
        

    //     const response = await modifyUser(id, undefined, newEmail, newPassword, newDescription, newImage, newLinksObj , newUpcomings)
       
    // /

    //     expect(response).to.not.exist

    //     const user = await User.findById(id)

    //     expect(user.toString()).to.equal(id)

    //     expect(user.username).to.exist
    //     expect(user.username).to.be.a('string')
    //     expect(user.username).to.have.length.greaterThan(0)
    //     expect(user.username).to.equal(username)

    //     expect(user.email).to.exist
    //     expect(user.email).to.be.a('string')
    //     expect(user.email).to.have.length.greaterThan(0)
    //     expect(user.email).to.equal(newEmail)

    //     expect(user.password).to.exist
    //     expect(user.password).to.be.a('string')
    //     expect(user.password).to.have.length.greaterThan(0)
    //     expect(user.password).to.equal(newPassword)

    //     expect(user.description).to.exist
    //     expect(user.description).to.be.a('string')
    //     expect(user.description).to.have.length.greaterThan(0)
    //     expect(user.description).to.equal(newDescription)

    //     expect(user.image).to.exist
    //     expect(user.image).to.be.a('string')
    //     expect(user.image).to.have.length.greaterThan(0)
    //     expect(user.image).to.equal(newImage)

    //     expect(user.links).to.exist
    //     expect(user.links).to.be.a('string')
    //     expect(user.links).to.have.length.greaterThan(0)
    //     expect(user.links).to.equal(newLinks)

    //     expect(user.upcomings).to.exist
    //     expect(user.upcomings).to.be.a('string')
    //     expect(user.upcomings).to.have.length.greaterThan(0)
    //     expect(user.upcomings).to.equal(newUpcomings)
    // })

    // it('should succeed on correct user and new user data, except for email', async () => {
    
    //     const newUsername = `new-username-${random()}`
    //     const newPassword = `new-password-${random()}`
    //     const newDescription = `new-description-${random()}`
    //     const newImage = `new-image-${random()}`
    //     const newLinks = `new-links-${random()}`
    //     const newUpcomings = `new-upcomings-${random()}`

    //     const { email } = await User.findById(id)

    //     const response = await modifyUser(newUsername, undefined, newPassword, newDescription, newImage, newLinks, newUpcomings)

    //     expect(response).to.not.exist

    //     const user = await User.findById(id)

    //     expect(user.toString()).to.equal(id)

    //     expect(user.username).to.exist
    //     expect(user.username).to.be.a('string')
    //     expect(user.username).to.have.length.greaterThan(0)
    //     expect(user.username).to.equal(newUsername)

    //     expect(user.email).to.exist
    //     expect(user.email).to.be.a('string')
    //     expect(user.email).to.have.length.greaterThan(0)
    //     expect(user.email).to.equal(email)

    //     expect(user.password).to.exist
    //     expect(user.password).to.be.a('string')
    //     expect(user.password).to.have.length.greaterThan(0)
    //     expect(user.password).to.equal(newPassword)

    //     expect(user.description).to.exist
    //     expect(user.description).to.be.a('string')
    //     expect(user.description).to.have.length.greaterThan(0)
    //     expect(user.description).to.equal(newDescription)

    //     expect(user.image).to.exist
    //     expect(user.image).to.be.a('string')
    //     expect(user.image).to.have.length.greaterThan(0)
    //     expect(user.image).to.equal(newImage)

    //     expect(user.links).to.exist
    //     expect(user.links).to.be.a('string')
    //     expect(user.links).to.have.length.greaterThan(0)
    //     expect(user.links).to.equal(newLinks)

    //     expect(user.upcomings).to.exist
    //     expect(user.upcomings).to.be.a('string')
    //     expect(user.upcomings).to.have.length.greaterThan(0)
    //     expect(user.upcomings).to.equal(newUpcomings)
    // })

    // it('should succeed on correct user and new user data, except for password', async () => {
        
    //     const newUsername = `new-username-${random()}`
    //     const newEmail = `new-email-${random()}@mail.com`
    //     const newDescription = `new-description-${random()}`
    //     const newImage = `new-image-${random()}`
    //     const newLinks = `new-links-${random()}`
    //     const newUpcomings = `new-upcomings-${random()}`

    //     const { password } = await User.findById(id)

    //     const response = await modifyUser(newUsername, newEmail, undefined, newDescription, newImage, newLinks, newUpcomings)

    //     expect(response).to.not.exist

    //     const user = await User.findById(id)

    //     expect(user.toString()).to.equal(id)

    //     expect(user.username).to.exist
    //     expect(user.username).to.be.a('string')
    //     expect(user.username).to.have.length.greaterThan(0)
    //     expect(user.username).to.equal(newUsername)

    //     expect(user.email).to.exist
    //     expect(user.email).to.be.a('string')
    //     expect(user.email).to.have.length.greaterThan(0)
    //     expect(user.email).to.equal(newEmail)

    //     expect(user.password).to.exist
    //     expect(user.password).to.be.a('string')
    //     expect(user.password).to.have.length.greaterThan(0)
    //     expect(user.password).to.equal(password)

    //     expect(user.description).to.exist
    //     expect(user.description).to.be.a('string')
    //     expect(user.description).to.have.length.greaterThan(0)
    //     expect(user.description).to.equal(newDescription)

    //     expect(user.image).to.exist
    //     expect(user.image).to.be.a('string')
    //     expect(user.image).to.have.length.greaterThan(0)
    //     expect(user.image).to.equal(newImage)

    //     expect(user.links).to.exist
    //     expect(user.links).to.be.a('string')
    //     expect(user.links).to.have.length.greaterThan(0)
    //     expect(user.links).to.equal(newLinks)

    //     expect(user.upcomings).to.exist
    //     expect(user.upcomings).to.be.a('string')
    //     expect(user.upcomings).to.have.length.greaterThan(0)
    //     expect(user.upcomings).to.equal(newUpcomings)
    // })

    // it('should succeed on correct user and new user data, except for description', async () => {
    //     const newUsername = `new-username-${random()}`
    //     const newEmail = `new-email-${random()}@mail.com`
    //     const newPassword = `new-password-${random()}`
    //     const newImage = `new-image-${random()}`
    //     const newLinks = `new-links-${random()}`
    //     const newUpcomings = `new-upcomings-${random()}`

    //     const { description } = await User.findById(id)

    //     const response = await modifyUser(newUsername, newEmail, newPassword, undefined, newImage, newLinks, newUpcomings)

    //     expect(response).to.not.exist

    //     const user = await User.findById(id)

    //     expect(user.toString()).to.equal(id)

    //     expect(user.username).to.exist
    //     expect(user.username).to.be.a('string')
    //     expect(user.username).to.have.length.greaterThan(0)
    //     expect(user.username).to.equal(newUsername)

    //     expect(user.email).to.exist
    //     expect(user.email).to.be.a('string')
    //     expect(user.email).to.have.length.greaterThan(0)
    //     expect(user.email).to.equal(newEmail)

    //     expect(user.password).to.exist
    //     expect(user.password).to.be.a('string')
    //     expect(user.password).to.have.length.greaterThan(0)
    //     expect(user.password).to.equal(newPassword)

    //     expect(user.description).to.exist
    //     expect(user.description).to.be.a('string')
    //     expect(user.description).to.have.length.greaterThan(0)
    //     expect(user.description).to.equal(description)

    //     expect(user.image).to.exist
    //     expect(user.image).to.be.a('string')
    //     expect(user.image).to.have.length.greaterThan(0)
    //     expect(user.image).to.equal(newImage)

    //     expect(user.links).to.exist
    //     expect(user.links).to.be.a('string')
    //     expect(user.links).to.have.length.greaterThan(0)
    //     expect(user.links).to.equal(newLinks)

    //     expect(user.upcomings).to.exist
    //     expect(user.upcomings).to.be.a('string')
    //     expect(user.upcomings).to.have.length.greaterThan(0)
    //     expect(user.upcomings).to.equal(newUpcomings)
    // })

    // it('should succeed on correct user and new user data, except for image', async () => {
        
    //     const newUsername = `new-username-${random()}`
    //     const newEmail = `new-email-${random()}@mail.com`
    //     const newPassword = `new-password-${random()}`
    //     const newDescription = `new-description-${random()}`
    //     const newLinks = `new-links-${random()}`
    //     const newUpcomings = `new-upcomings-${random()}`

    //     const { image } = await User.findById(id)

    //     const response = await modifyUser(newUsername, newEmail, newPassword, newDescription, undefined, newLinks, newUpcomings)

    //     expect(response).to.not.exist

    //     const user = await User.findById(id)

    //     expect(user.toString()).to.equal(id)

    //     expect(user.username).to.exist
    //     expect(user.username).to.be.a('string')
    //     expect(user.username).to.have.length.greaterThan(0)
    //     expect(user.username).to.equal(newUsername)

    //     expect(user.email).to.exist
    //     expect(user.email).to.be.a('string')
    //     expect(user.email).to.have.length.greaterThan(0)
    //     expect(user.email).to.equal(newEmail)

    //     expect(user.password).to.exist
    //     expect(user.password).to.be.a('string')
    //     expect(user.password).to.have.length.greaterThan(0)
    //     expect(user.password).to.equal(newPassword)

    //     expect(user.description).to.exist
    //     expect(user.description).to.be.a('string')
    //     expect(user.description).to.have.length.greaterThan(0)
    //     expect(user.description).to.equal(newDescription)

    //     expect(user.image).to.exist
    //     expect(user.image).to.be.a('string')
    //     expect(user.image).to.have.length.greaterThan(0)
    //     expect(user.image).to.equal(image)

    //     expect(user.links).to.exist
    //     expect(user.links).to.be.a('string')
    //     expect(user.links).to.have.length.greaterThan(0)
    //     expect(user.links).to.equal(newLinks)

    //     expect(user.upcomings).to.exist
    //     expect(user.upcomings).to.be.a('string')
    //     expect(user.upcomings).to.have.length.greaterThan(0)
    //     expect(user.upcomings).to.equal(newUpcomings)
    // })

    // it('should succeed on correct user and new user data, except for links', async () => {
        
    //     const newUsername = `new-username-${random()}`
    //     const newEmail = `new-email-${random()}@mail.com`
    //     const newPassword = `new-password-${random()}`
    //     const newDescription = `new-description-${random()}`
    //     const newImage = `new-image-${random()}`
    //     const newUpcomings = `new-upcomings-${random()}`

    //     const { links } = await User.findById(id)

    //     const response = await modifyUser(newUsername, newEmail, newPassword, newDescription, newImage, undefined, newUpcomings)

    //     expect(response).to.not.exist

    //     const user = await User.findById(id)

    //     expect(user.toString()).to.equal(id)

    //     expect(user.username).to.exist
    //     expect(user.username).to.be.a('string')
    //     expect(user.username).to.have.length.greaterThan(0)
    //     expect(user.username).to.equal(newUsername)

    //     expect(user.email).to.exist
    //     expect(user.email).to.be.a('string')
    //     expect(user.email).to.have.length.greaterThan(0)
    //     expect(user.email).to.equal(newEmail)

    //     expect(user.password).to.exist
    //     expect(user.password).to.be.a('string')
    //     expect(user.password).to.have.length.greaterThan(0)
    //     expect(user.password).to.equal(newPassword)

    //     expect(user.description).to.exist
    //     expect(user.description).to.be.a('string')
    //     expect(user.description).to.have.length.greaterThan(0)
    //     expect(user.description).to.equal(newDescription)

    //     expect(user.image).to.exist
    //     expect(user.image).to.be.a('string')
    //     expect(user.image).to.have.length.greaterThan(0)
    //     expect(user.image).to.equal(newImage)

    //     expect(user.links).to.exist
    //     expect(user.links).to.be.a('string')
    //     expect(user.links).to.have.length.greaterThan(0)
    //     expect(user.links).to.equal(links)

    //     expect(user.upcomings).to.exist
    //     expect(user.upcomings).to.be.a('string')
    //     expect(user.upcomings).to.have.length.greaterThan(0)
    //     expect(user.upcomings).to.equal(newUpcomings)
    // })

    // it('should succeed on correct user and new user data, except for upcomings', async () => {
        
    //     const newUsername = `new-username-${random()}`
    //     const newEmail = `new-email-${random()}@mail.com`
    //     const newPassword = `new-password-${random()}`
    //     const newDescription = `new-description-${random()}`
    //     const newImage = `new-image-${random()}`
    //     const newLinks = `new-links-${random()}`
        

    //     const { upcomings } = await User.findById(id)

    //     const response = await modifyUser(newUsername, newEmail, newPassword, newDescription, newImage, newLinks, undefined)

    //     expect(response).to.not.exist

    //     const user = await User.findById(id)

    //     expect(user.toString()).to.equal(id)

    //     expect(user.username).to.exist
    //     expect(user.username).to.be.a('string')
    //     expect(user.username).to.have.length.greaterThan(0)
    //     expect(user.username).to.equal(newUsername)

    //     expect(user.email).to.exist
    //     expect(user.email).to.be.a('string')
    //     expect(user.email).to.have.length.greaterThan(0)
    //     expect(user.email).to.equal(newEmail)

    //     expect(user.password).to.exist
    //     expect(user.password).to.be.a('string')
    //     expect(user.password).to.have.length.greaterThan(0)
    //     expect(user.password).to.equal(newPassword)

    //     expect(user.description).to.exist
    //     expect(user.description).to.be.a('string')
    //     expect(user.description).to.have.length.greaterThan(0)
    //     expect(user.description).to.equal(newDescription)

    //     expect(user.image).to.exist
    //     expect(user.image).to.be.a('string')
    //     expect(user.image).to.have.length.greaterThan(0)
    //     expect(user.image).to.equal(newImage)

    //     expect(user.links).to.exist
    //     expect(user.links).to.be.a('string')
    //     expect(user.links).to.have.length.greaterThan(0)
    //     expect(user.links).to.equal(newLinks)

    //     expect(user.upcomings).to.exist
    //     expect(user.upcomings).to.be.a('string')
    //     expect(user.upcomings).to.have.length.greaterThan(0)
    //     expect(user.upcomings).to.equal(upcomings)
    // })


    // it('should fail on unexisting user and correct user data', async () => {
    //     const id = ObjectId().toString()
    //     const newUsername = taskIds.random()
    //     const newEmail = `new-email-${random()}@mail.com`
    //     const newPassword = `new-password-${random()}`
    //     const newDescription = `new-description-${random()}`
    //     const newImage = `new-image-${random()}`
    //     const newLinks = `new-links-${random()}`
    //     const newUpcomings = `new-upcomings-${random()}`
     

    //     try {
    //         await modifyUser(id, newUsername, newEmail, newPassword, newDescription, newImage, newLinks, newUpcomings)

    //         throw new Error('should not reach this point')
    //     } catch (error) {
    //         expect(error).to.exist
    //         expect(error).to.be.an.instanceOf(NotFoundError)
    //         expect(error.message).to.equal(`user with id ${id} not found`)
    //     }
    // })

    // TODO other test cases

    after(() => User.deleteMany().then(database.disconnect))
})