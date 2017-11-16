# Code Makers Chat

![alt text](https://firebasestorage.googleapis.com/v0/b/quien-ba643.appspot.com/o/MandaleLogo-04.png?alt=media&token=cbd41f92-f6d0-4120-ab6a-af511a3f7502)

A chat with angular 4 and Firebase

## DB schema

-|users
    -|$uid
        name: string
        followers: number
        gender: string
        birth: date
        about: string
        photoURL: string
        -|followers
            -|$key: true
        -|followeds
            -|$key: true
-|conversations
    -|$uid
        -|fromID
            -|message
                name: string
                date: date
                body: string
                like: boolean
-|genders
    -|$key
        icon: string
        title: string
-|followers
    -|$uid
        follower.uid: true
-|followeds
    -|$uid
        followed.uid: true

## How install

This APP required someone dependencies they are:

1. npm
2. angular-cli
3. git

When you have ready the dependencies just follow this tasks.

You should type this:

1. `git clone https://github.com/G33N/CodeMakersChat.git`
2. `cd CodeMakersChat`
3. `npm install`
4. `bower install`

End.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Authors

- **Celiz Matias** - _Development Manager / Support Manager_ - [G33N](https://github.com/G33N) See also the list of [contributors](https://github.com/G33N/CodeMakers/contributors) who participated in this project.
