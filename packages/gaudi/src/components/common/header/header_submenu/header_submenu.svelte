<script lang="ts">
  import type { MenuSection, UserModel } from "hegel";

  export let user: UserModel;
  export let toggleMenu: (changeTo?: boolean) => void;

  export let menuSectionsLoader: (user: UserModel) => [MenuSection];
  const menuSections = menuSectionsLoader(user);
</script>

<div
  class="w-40 bg-white rounded-sm flex-col justify-start items-start inline-flex"
  on:mouseleave={() => toggleMenu(false)}
  role="menu"
  tabindex={7}
>
  {#each menuSections as section, i}
    {#if section.title}
      <div
        class="text-menu-section-title text-xs px-5 py-2.5 font-bold font-['Montserrat'] leading-3"
      >
        {section.title}
      </div>
    {/if}
    {#each section.items as item}
      {@const action = item.action}
      {@const href = item.href}

      <div
        class="h-8 px-5 py-2.5 flex-col justify-start items-start gap-2.5 flex"
      >
        <div class="self-stretch h-3.5 justify-start items-center gap-1 flex">
          {#if action}
            <button
              on:click={() => {
                action();
              }}
              class="text-black text-xs font-normal font-['Montserrat'] leading-3"
            >
              {item.text}
            </button>
          {:else if href}
            <a
              {href}
              class="text-black text-xs font-normal font-['Montserrat'] leading-3"
            >
              {item.text}
            </a>
          {/if}
        </div>
      </div>
    {/each}
    {#if i < menuSections.length - 1}
      <div class="self-stretch h-px border border-[#dadada]"></div>
    {/if}
  {/each}
</div>
