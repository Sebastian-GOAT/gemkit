# Gemkit

## Description

Gemkit is a JavaScript framework/library for building user interfaces fast.
It uses functional components with ESM imports and exports, making the code
readable and modern.

## Key concepts

### ⚡ Functional components

Gemkit uses functional components to build UI's like a house - brick by brick.

```js
import { H1 } from 'gemkit/elements';

export default function HomePage() {

    return H1({
        children: ['This is my awesome app!']
    });
}
```

### 🛠️ Custom components

You can also create custom components and pass props to them. You
might want to consider using the global state manager to avoid prop
drilling.

```js
import Foo from '../components/Foo.js';

export default function App() {

    return Foo({
        bar: 'baz'
    });
}
```

Then the Foo component:

```js
import { H1 } from 'gemkit/elements';

export default function Foo({ bar }) {

    return H1({
        children: [bar]
    });
}
```

### 🔀 Hash router

Gemkit uses a hash routing system to allow routing on single page applications.

Use it as a return statement in your root (App) component. The Router takes
3 arguments:

1. Static routes
2. Dynamic routes
3. Fallback (not found)

```js
import { HashRouter } from 'gemkit/router';
import Home from './pages/Home.js';
import About from './pages/About.js';
import User from './pages/User.js';
import NotFound from './pages/NotFound.js';

export default function App() {

    return HashRouter(
        {
            '/': Home,
            '/about': About
        },
        {
            '/user': User
        },
        NotFound
    );
}
```

With dynamic routes, the router will automaticly pass in the :id
as an argument.

For example, `https://www.yoursite.com/user/abcfoobarbazxyz`:

```js
import { fetchUser } from '../lib/util/fetch.js';
import { ReactiveState } from 'gemkit/hooks';
import { H1 } from 'gemkit/elements';

export default function User(uid) {

    const [user, setUser] = ReactiveState('user', null);

    fetchData(uid).then(u => setUser(u));

    return H1({
        children: user ? [`Welcome, ${user}!`] : ['Loading...']
    });
}
```

### 🚦 State & state manangement

All state is stored in a global object. You can have state
in your application by using the `ReactiveState` hook, which
takes 2 arguments:

1. Key (unique identifier)
2. Initial value

The hook then returns an array with 2 values, where the 1st one
is the value and the 2nd is the setter function. Use the setter
function to update the value, never modify the value on it's own.

You can access a global state by using the same key (to avoid prop
drilling), or create a new one by using a unique key.

Keep in mind, that updating the state rerenders the whole application,
not just the component. All code inside a component (like the `console.log`
below) will execute on every rerender.

```js
import { ReactiveState } from 'gemkit/hooks';
import { Button } from 'gemkit/elements';

export default function Counter() {

    const [count, setCount] = ReactiveState('count', 0);

    console.log(`Count: ${count}`);

    return Button({
        children: ['Increment'],
        onClick: () => setCount(count + 1)
    });
}
```

## 📞 Contact

Have any questions or suggestions? <br>
📧 Email: sebastianrucabado0@gmail.com <br>
📬 Or open an [issue](https://github.com/Sebastian-GOAT/gemkit/issues) right here on GitHub.