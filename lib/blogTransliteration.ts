import React, { cloneElement, isValidElement, ReactNode } from "react";
import { convertText, Script } from "@/lib/converter";
import { Locale } from "@/lib/translations";
import { Post } from "@/lib/posts";

/**
 * Determines which script to use based on the user's active site locale.
 */
export function targetScriptFromLocale(locale: Locale): Script {
  switch (locale) {
    case "uz-lat":
    case "en":
      return "latin-old";
    case "uz-cyr":
    case "ru":
    default:
      return "cyrillic";
  }
}

/**
 * Recursively transliterates text within a React node tree from Cyrillic to the target script.
 */
export function transliterateReactNodes(
  node: ReactNode,
  targetScript: Script
): ReactNode {
  if (targetScript === "cyrillic" || node == null) {
    return node;
  }

  // Primitive strings: directly convert
  if (typeof node === "string") {
    return convertText(node, "cyrillic", targetScript);
  }

  // Booleans / numbers
  if (typeof node === "number" || typeof node === "boolean") {
    return node;
  }

  // Arrays of children
  if (Array.isArray(node)) {
    return node.map((child, index) =>
      React.createElement(
        React.Fragment,
        { key: index },
        transliterateReactNodes(child, targetScript)
      )
    );
  }

  // React elements
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode; [key: string]: any };
    if (!props || props.children === undefined) {
      return node;
    }

    return cloneElement(
      node as React.ReactElement<any>,
      undefined,
      transliterateReactNodes(props.children, targetScript)
    );
  }

  return node;
}

/**
 * Returns a transliterated copy of a post's title, description, and keywords.
 */
export function getTransliteratedPost(post: Post, targetScript: Script) {
  if (targetScript === "cyrillic") {
    return post;
  }

  return {
    ...post,
    title: convertText(post.title, "cyrillic", targetScript),
    description: convertText(post.description, "cyrillic", targetScript),
  };
}
