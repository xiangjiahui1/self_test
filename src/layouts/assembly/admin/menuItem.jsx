import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';
import IconComponent from './../../../views/permission/iconComponent'
let menuItem = defineComponent({
    name: 'menuItem',
    props: {
        menuData: {
            type: Object,
            default: () => { }
        }
    },
    components: {
        IconComponent
    },
    setup() {
        let router = useRouter();
        let jumpPage = (value) => {
            if (value.meta.link) {
                window.open(value.meta.link);
            } else {
                router.push(value.realyPath);
            }
        };
        return {
            jumpPage
        }
    },
    render() {
        let setComIcon = (name) => {
            return name ? <IconComponent iconName={name}></IconComponent> : ''
        }
        let setSubMenu = (val) => {
            return (
                <a-sub-menu key={val.id} title={val.meta.title} icon={setComIcon(val.meta.icon)}>
                    {val.children.map(item => {
                        return (item.children && item.children.length > 0) ? setSubMenu(item) : <a-menu-item key={item.id} icon={setComIcon(item.meta.icon)} onClick={() => this.jumpPage(item)}>{item.meta.title}</a-menu-item>
                    })}
                </a-sub-menu>
            )
        }
        return (
            <>
                {setSubMenu(this.menuData)}
            </>
        )
    }
})

export default menuItem